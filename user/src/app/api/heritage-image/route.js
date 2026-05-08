import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const defaultHeritagePath =
  "C:\\Users\\vishv\\.cursor\\projects\\c-Users-vishv-Documents-kaamzy\\assets\\c__Users_vishv_AppData_Roaming_Cursor_User_workspaceStorage_de1018e9bf99052a62e52cf231d7c1f7_images_pngtree-red-fort-india-png-image_11541567-aba26b5b-c8cc-4c96-a45b-f6fe4955a9ed.png";

export async function GET() {
  const targetPath = process.env.HERITAGE_IMAGE_PATH || defaultHeritagePath;

  try {
    if (!fs.existsSync(targetPath)) {
      return NextResponse.json({ error: "Heritage image not found" }, { status: 404 });
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
    return NextResponse.json({ error: "Failed to load heritage image" }, { status: 500 });
  }
}
