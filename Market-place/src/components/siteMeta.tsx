import Helmet from "react-helmet";

interface MetaProps {
  title: string;
}

export default function Meta(props: MetaProps) {
  return (
    <Helmet>
      <title>{props.title ? `${props.title} | ` : ""}Annes Marketplace</title>
    </Helmet>
  );
}
