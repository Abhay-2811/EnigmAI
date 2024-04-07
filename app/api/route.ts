export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  // files.forEach(async (file: File) => {
  //   const data = await file.arrayBuffer();
  //   console.log(await uplaodImg(file.name, data));
  // });
  return Response.json({ status: 200 });
}
 