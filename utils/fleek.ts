import { FleekSdk, PersonalAccessTokenService } from "@fleekxyz/sdk";

const newAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: process.env.NEXT_PUBLIC_FLEEK_PAT as string,
  projectId: process.env.NEXT_PUBLIC_FLEEK_PID as string,
});

const fleekSdk = new FleekSdk({ accessTokenService: newAccessTokenService });

// returns path of input sring
export async function uplaodImg(
  filename: string,
  content: ArrayBuffer
): Promise<string> {
  const result = await fleekSdk.ipfs().add({
    path: filename,
    content: content,
  });

  return result.path;
}
