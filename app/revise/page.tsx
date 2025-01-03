import { FlashCards } from "@/components/flash-cards";
import ThreadIdViewer from "@/components/ThreadIdViewer";

// After the user submits the topics they want to learn about, they are redirected to this page which renders the FlashCards component where users can
// scroll through the flashcard data returned from the server

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
