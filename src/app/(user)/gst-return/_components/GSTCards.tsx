export interface AutoGSTData {
  totalSales: number;
  totalPurchases: number;
  cgstCollected: number;
  sgstCollected: number;
  igstCollected: number;
  inputTaxCredit: number;
  netTaxLiability: number;
  lastFilingDate: string;
  nextDueDate: string;
  filingStatus: "pending" | "filed" | "overdue";
}

export const StatRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span
      className={`text-gray-600 ${
        highlight ? "font-semibold text-gray-900" : ""
      }`}
    >
      {label}
    </span>
    <span
      className={`font-semibold ${
        highlight ? "text-green-600 text-xl" : "text-lg"
      }`}
    >
      {value}
    </span>
  </div>
);

export const InfoCard = ({
  icon: Icon,
  title,
  text,
  color,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  color: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
    <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
    <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

export const StatusBadge = ({
  status,
}: {
  status: AutoGSTData["filingStatus"];
}) => {
  const statusMap = {
    filed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    overdue: "bg-red-100 text-red-800",
  };
  const text =
    status === "filed" ? "Filed" : status === "pending" ? "Pending" : "Overdue";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusMap[status]}`}
    >
      {text}
    </span>
  );
};
