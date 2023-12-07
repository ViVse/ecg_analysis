import useScript from "@/app/hooks/useScript";
import * as fs from "fs";
import * as path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("data");
  const filePath = path.join(__dirname, "../../../../../public/data/data.txt");
  fs.writeFileSync(filePath, data);
  const res = await useScript("main.py");

  return Response.json({ isNormal: res });
}
