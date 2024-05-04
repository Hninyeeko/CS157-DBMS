import Image from "next/image";
import {connect} from "./database/page";
import {selectAllStudents} from "./database/page";

let connection1 = connect();
selectAllStudents();

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p> hello world!</p>
    </main>
  );
}
