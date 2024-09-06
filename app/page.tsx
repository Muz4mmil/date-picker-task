import Calender from "@/components/Calender";
import CustomizationPanel from "@/components/CustomizationPanel";
import DatePicker from "@/components/DatePicker";
import RecurrenceOptions from "@/components/RecurrenceOptions";

const Home = () => {
  return (
    <div className="min-h-screen w-4/5 flex gap-10 items-center justify-center mx-auto">
      <div className="flex flex-col w-1/2 gap-2">
        <RecurrenceOptions />
        <CustomizationPanel />
        <DatePicker />
      </div>
      <div className="w-1/2">
        <Calender />
      </div>
    </div>
  );
};

export default Home;
