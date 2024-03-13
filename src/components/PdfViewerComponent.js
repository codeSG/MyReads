import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    let PSPDFKit, instance;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      PSPDFKit.unload(container);

      instance = await PSPDFKit.load({
        container,
        document: props.document, // URL string for PDF
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]); // Re-render component when document URL changes

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
