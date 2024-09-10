import { CartProduct } from "@/definitions/types";
import { formatPrice } from "@/lib/utils";
import {
  Html,
  Text,
  Img,
  Container,
  Row,
  Column,
  Section,
  Body,
  Head,
} from "@react-email/components";

type EmailOrderProps = {
  items: CartProduct[];
  email: string;
  fullName?: string;
  phone: string;
};

export default function EmailOrder({
  items,
  email,
  fullName,
  phone,
}: EmailOrderProps) {
  // Calculate the total sum of all items
  let totalSum = items.reduce(
    (sum, item) => sum + (item.price_with_vat! * item.quantity! ?? 0),
    0
  );

  return (
    <Html>
      <Head>
        <style>{`
          table, td, div, h1, p { font-family: Arial, sans-serif; }
        `}</style>
      </Head>
      <Body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
                margin: "0",
              }}
            >
              Поръчка за <span style={{ fontStyle: "italic" }}>{email}</span>
            </h1>
            <div
              style={{
                fontSize: "16px",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              <p>Име: {fullName}</p>
              <p>Телефон: {phone}</p>
            </div>
            <Row style={{ marginTop: "20px" }}>
              {items.map((product: CartProduct) => {
                return (
                  <Column
                    key={product.id}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Img
                      src={product.main_picture_url as string}
                      alt={product.name!}
                      width={200}
                      height={200}
                      style={{
                        display: "block",
                        margin: "0 auto",
                        objectFit: "contain",
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        marginTop: "10px",
                      }}
                    >
                      {product.name} - {product.category}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      {product.quantity} бр. x{" "}
                      {formatPrice(product.price_with_vat!, {
                        currency: "BGN",
                        notation: "standard",
                        IntlFormat: "bg-BG",
                      })}
                    </Text>
                  </Column>
                );
              })}
            </Row>
            <Section
              style={{
                marginTop: "20px",
                textAlign: "center",
                paddingTop: "10px",
                borderTop: "1px solid #ddd",
              }}
            >
              <Text
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Общо:{" "}
                {formatPrice(totalSum, {
                  currency: "BGN",
                  notation: "standard",
                  IntlFormat: "bg-BG",
                })}
                <Text
                  style={{
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "#5a5858",
                  }}
                >
                  Цената е без включена доставка!
                </Text>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
