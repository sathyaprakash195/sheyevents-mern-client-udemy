import { useEffect, useState } from "react";
import PageTitle from "../../../../components/page-title";
import { message } from "antd";
import { getUserReports } from "../../../../api-services/reports-service";
import ReportCard from "../../admin/reports/report-card";

function UserReports() {
  const [reports, setReports] = useState<any>({});

  const getData = async () => {
    try {
      const response = await getUserReports();
      setReports(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />

      
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <ReportCard
          title="Total Bookings"
          description="Total number of bookings made by current user"
          value={reports.totalBookings}
          isAmountProperty={false}
        />

        <ReportCard
          title="Cancelled Bookings"
          description="Total number of bookings cancelled by current user"
          value={reports.cancelledBookings}
          isAmountProperty={false}
        />

        <ReportCard
          title="Amount Spent"
          description="Total amount spent on bookings by current user"
          value={reports.totalAmountSpent}
          isAmountProperty={true}
        />

        <ReportCard
          title="Amount Received in Refunds"
          description="Total amount received in refunds for cancelled bookings"
          value={reports.totalAmountReceivedAsRefund}
          isAmountProperty={true}
        />

        <ReportCard
          title="Tickets Purchased"
          description="Total number tickets purchased for all events by current user"
          value={reports.totalTickets}
          isAmountProperty={false}
        />

        <ReportCard
          title="Tickets Cancelled"
          description="Total number tickets cancelled for all events by current user"
          value={reports.cancelledTickets}
          isAmountProperty={false}
        />
      </div>
    </div>
  );
}

export default UserReports;
