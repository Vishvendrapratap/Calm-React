import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const defaultEmblemPath =
  "C:\\Users\\vishv\\.cursor\\projects\\c-Users-vishv-Documents-kaamzy\\assets\\c__Users_vishv_AppData_Roaming_Cursor_User_workspaceStorage_de1018e9bf99052a62e52cf231d7c1f7_images_png-transparent-lion-capital-of-ashoka-sarnath-state-emblem-of-india-national-symbols-of-india-symbol-1a3869f4-662b-41a2-a4f5-ce63685d2b89.png";

export async function GET() {
  const targetPath = process.env.EMBLEM_IMAGE_PATH || defaultEmblemPath;

  try {
    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: "Emblem image not found" }, { status: 404 });
    }

    const imageBuffer = fs.readFileSync(targetPath);
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load emblem image" }, { status: 500 });
  }
}
