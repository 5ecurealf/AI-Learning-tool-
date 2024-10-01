import { FlashCards } from "@/components/flash-cards";
import ThreadIdViewer from "@/components/ThreadIdViewer";

export default function Page() {
  return (
    <>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "rgb(238, 195, 232)",
        }}
      >
        Revision Cards Page
      </p>
      <FlashCards></FlashCards>
      <ThreadIdViewer></ThreadIdViewer>
    </>
  );
}
