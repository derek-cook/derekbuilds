import { ImageResponse } from "next/og";
import { env } from "~/env.mjs";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Derek Builds AI";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const outfitRegular = fetch(
    new URL("../../public/fonts/Outfit-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const outfitRegularData = await outfitRegular;

  const imageData = await fetch(
    new URL("../../public/pool_1_sm.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "3rem 3rem",
        }}
      >
        <img
          alt="pool"
          style={{
            fontSize: 128,
            position: "absolute",
            right: -100,
            top: -150,
          }}
          width="500"
          height="500"
          src={imageData as unknown as string}
        />
        <h1
          style={{
            fontSize: 128,
            color: "transparent",
            backgroundImage: `url(${env.NEXT_PUBLIC_WEBSITE_URL}/bg-og-text.png)`,
            backgroundClip: "text",
          }}
        >
          Derek Builds
        </h1>
        <h2
          style={{
            fontSize: 64,
            color: "#727272",
            marginTop: -30,
          }}
        >
          software concepts
        </h2>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: outfitRegularData,
          style: "normal",
        },
      ],
    },
  );
}
