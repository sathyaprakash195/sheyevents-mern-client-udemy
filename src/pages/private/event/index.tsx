import { useEffect, useState } from "react";
import { EventType } from "../../../interfaces";
import { getEventById } from "../../../api-services/events-service";
import { useParams } from "react-router-dom";
import { Image, message } from "antd";
import Spinner from "../../../components/spinner";
import { MapPin, Timer } from "lucide-react";
import {
  getDateFormat,
  getDateTimeFormat,
} from "../../../helpers/date-time-formats";
import TicketsSelection from "./common/tickets-selection";

function EventInfoPage() {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  const renderEventProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    eventData && (
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gray-600">{eventData?.name}</h1>
          <div className="flex gap-10">
            <div className="flex gap-1 text-gray-500 items-center">
              <MapPin size={12} />
              <span className="text-gray-500 text-xs">
                {eventData?.address} {eventData?.city} {eventData?.pincode}
              </span>
            </div>

            <div className="flex gap-1 text-gray-500 items-center">
              <Timer size={16} />
              <span className="text-gray-500 text-xs">
                {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-7">
          {eventData?.media.map((media, index) => (
            <Image
              src={media}
              height={220}
              className="object-cover rounded"
              key={index}
            />
          ))}
        </div>

        <div className="mt-7">
          <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 bg-gray-100 mt-7 gap-5">
          {renderEventProperty("Organizer", eventData?.organizer)}
          {renderEventProperty("Address", eventData?.address)}
          {renderEventProperty("City", eventData?.city)}
          {renderEventProperty("Pincode", eventData?.pincode)}
          {renderEventProperty("Date", getDateFormat(eventData.date))}
          {renderEventProperty("Time", eventData.time)}
          <div className="col-span-3">
            {renderEventProperty("Guests", eventData.guests.join(", "))}
          </div>
        </div>

        <div className="mt-7">
          <TicketsSelection eventData={eventData} />
        </div>
      </div>
    )
  );
}

export default EventInfoPage;
