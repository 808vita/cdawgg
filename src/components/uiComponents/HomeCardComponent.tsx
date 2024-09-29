import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function HomeCardComponent({ pageItem }) {
  return (
    <div className="flex justify-center content-center">
      <Card className="max-w-[400px]" >
        <CardHeader className="flex gap-3">
          <Image
            alt="cdawgg logo"
            height={60}
            radius="lg"
            src="/cdawgg-slide-export.png"
            width={100}
          />
          <div className="flex flex-col">
            <p className="text-md">{pageItem.cardHeading}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{pageItem.description}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link className="text-lg" showAnchorIcon href={pageItem.pageLink}>
            {pageItem.cardHeading}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
