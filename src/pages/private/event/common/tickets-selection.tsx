import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input, message } from "antd";
import PaymentModal from "./payment-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../../../api-services/payments-service";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function TicketsSelection({ eventData }: { eventData: EventType }) {
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketsCount, setSelectedTicketsCount] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [stripeOptions, setStripeOptions] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const ticketTypes = eventData.ticketTypes;

  const selectedTicketPrice = ticketTypes.find(
    (ticketType) => ticketType.name === selectedTicketType
  )?.price;

  const totalAmount = (selectedTicketPrice || 0) * selectedTicketsCount;

  const getClientSecretAndOpenPaymentModal = async () => {
    try {
      setLoading(true);
      const resposne = await getClientSecret(totalAmount);
      setStripeOptions({
        clientSecret: resposne.clientSecret,
      });
      setShowPaymentModal(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-sm text-info font-bold">Select ticket type</h1>

        <div className="flex flex-wrap gap-5 mt-3">
          {ticketTypes.map((ticketType, index) => {
            const available = ticketType.available ?? ticketType.limit;
            return (
              <div
                key={index}
                className={`p-2 border border-gray-200 bg-gray-100 lg:w-96 w-full cursor-pointer
             ${
               selectedTicketType === ticketType.name
                 ? "border-primary border-solid border-2"
                 : ""
             }
            `}
                onClick={() => {
                  setSelectedTicketType(ticketType.name);
                  setMaxCount(available);
                }}
              >
                <h1 className="text-sm text-gray-500 uppercase">
                  {ticketType.name}
                </h1>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">$ {ticketType.price}</h1>
                  <h1 className="text-xs">{available} Left</h1>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-sm text-info font-bold mt-10">
            Select tickets count
          </h1>

          <Input
            type="number"
            value={selectedTicketsCount}
            className="w-96"
            onChange={(e) => setSelectedTicketsCount(parseInt(e.target.value))}
            min={1}
            max={maxCount}
          />

          <span className="text-gray-600 text-sm mt-2 font-bold">
            {selectedTicketsCount > maxCount
              ? `Only ${maxCount} tickets available`
              : ""}
          </span>
        </div>

        <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3 items-center">
          <h1 className="text-xl text-gray-500 font-bold">
            Total Amount : $ {totalAmount}
          </h1>
          <Button
            type="primary"
            onClick={() => {
              getClientSecretAndOpenPaymentModal();
            }}
            disabled={
              !selectedTicketType ||
              !selectedTicketsCount ||
              loading ||
              selectedTicketsCount > maxCount
            }
            loading={loading}
          >
            Book Now
          </Button>
        </div>
      </div>

      {stripeOptions?.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          {showPaymentModal && (
            <PaymentModal
              showPaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
              selectedTicketType={selectedTicketType}
              selectedTicketsCount={selectedTicketsCount}
              totalAmount={totalAmount}
              event={eventData}
            />
          )}
        </Elements>
      )}
    </div>
  );
}

export default TicketsSelection;
