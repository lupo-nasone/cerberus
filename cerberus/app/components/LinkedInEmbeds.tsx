"use client";

import { useEffect, useRef } from "react";

type Props = {
  htmls: string[];
};

export default function LinkedInEmbeds({ htmls }: Props) {
  return (
    <div className="space-y-8">
      {htmls.map((h, i) => (
        <div key={i} className="embed-wrapper card">
          {/* We render the saved iframe HTML directly inside a responsive wrapper */}
          <div dangerouslySetInnerHTML={{ __html: h }} />
        </div>
      ))}
    </div>
  );
}
