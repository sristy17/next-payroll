import Navbar from "@/components/Navbar";

export default function GstReturn() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col pl-10 pr-8 pt-8">
        <Navbar
          title="GST Return Filing"
          description="File your GST returns with ease."
        />
      </div>
    </div>
  );
}
