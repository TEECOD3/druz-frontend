import * as React from "react";

const AdOne: React.FC = () => {
  React.useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
      }}
      data-ad-client="ca-pub-6223283242649033"
      data-ad-slot="3728453259"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdOne;
