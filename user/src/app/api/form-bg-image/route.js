import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const defaultFormBgPath =
  "C:\\Users\\vishv\\.cursor\\projects\\c-Users-vishv-Documents-kaamzy\\assets\\c__Users_vishv_AppData_Roaming_Cursor_User_workspaceStorage_de1018e9bf99052a62e52cf231d7c1f7_images_4838651-db227bf4-b90e-4529-84fa-ed0fdecce0f9.png";

export async function GET() {
  const targetPath = process.env.FORM_BG_IMAGE_PATH || defaultFormBgPath;

  try {
    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: "Form background image not found" }, { status: 404 });
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
    return NextResponse.json({ error: "Failed to load form background image" }, { status: 500 });
  }
}
