/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5l4foDTynJ2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadForm } from "./ui/uploadForm";

export function LearningDashboard() {
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* side navigation  */}
      <aside className="w-64 p-4 bg-gray-100">
        <h2 className="mb-8 text-2xl font-bold flex items-center">
          <BookIcon className="w-6 h-6 mr-2" />
          Learn
        </h2>
        <nav className="space-y-4">
          <Button
            variant="ghost"
            className="flex items-center w-full text-left"
          >
            <ComponentIcon className="w-5 h-5 mr-2" />
            Material
          </Button>
          <Button
            variant="ghost"
            className="flex items-center w-full text-left"
          >
            <RedoIcon className="w-5 h-5 mr-2" />
            Revise
          </Button>
          <Button
            variant="ghost"
            className="flex items-center w-full text-left"
          >
            <CheckIcon className="w-5 h-5 mr-2" />
            Results
          </Button>
          <Button
            variant="ghost"
            className="flex items-center w-full text-left"
          >
            <TestTubeIcon className="w-5 h-5 mr-2" />
            Test
          </Button>
          <Button
            variant="ghost"
            className="flex items-center w-full text-left"
          >
            <WebcamIcon className="w-5 h-5 mr-2" />
            Chat
          </Button>
        </nav>
      </aside>
      {/* main page  */}
      <main className="flex-1 p-8">
        <h1 className="mb-4 text-3xl font-bold text-primary">Data Ingest</h1>
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Resources</h2>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg bg-blue-50">
            <UploadForm setState={setFileUploaded}></UploadForm>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Topics to learn</h2>
          <p className="mb-4 text-gray-600">
            Here are some suggested topics to learn from
          </p>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
            <Button variant="default">Topic</Button>
          </div>
        </section>
        <section className="mb-8">
          <Label htmlFor="prompt" className="block mb-2 text-sm font-medium">
            Explain what you want to learn about in more detail
          </Label>
          <Input id="prompt" placeholder="Value" />
        </section>
        <Button className="mx-auto">Generate</Button>
      </main>
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ComponentIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
      <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
      <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
      <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
    </svg>
  );
}

function RedoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7v6h-6" />
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
    </svg>
  );
}

function TestTubeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  );
}

function WebcamIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
