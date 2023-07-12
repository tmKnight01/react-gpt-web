import cx from "classnames";
import Text from "@/components/Text";
import { Image } from "antd";
import "./index.scss";
interface ChatMessage {
  inversion: boolean; // true 为request， false为reply,
  dateTime?: string;
  content: string;
  isLoading?: boolean;
}

const cls = "mes";

const ChatMessage = ({
  inversion,
  dateTime,
  content,
  isLoading = false,
}: ChatMessage): JSX.Element => {
  return (
    <div
      className={cx(cls)}
      style={{ flexDirection: inversion ? "row" : "row-reverse" }}
    >
      <Image
        className={cx([
          `${cls}_avatar`,
          {
            mr_6: inversion,
            ml_6: !inversion,
          },
        ])}
        src={
          inversion
            ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJsAmwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAQIHAAj/xAA5EAACAQMCBQMBBQcDBQEAAAABAgMABBEFIQYSMUFREyJhcQcUMoGRIzNSobHR8ELB4RUWJGLxU//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABoRAQEBAAMBAAAAAAAAAAAAAAABESExQQL/2gAMAwEAAhEDEQA/AOKKc1nNY/1ZxWTjOelZbeGax03rbbHWtc0TWQM99q2A36bD5rMS5Ge9SY+MVWbU0TFI2I8VRlkMj8x7/wAqsyMRDsTVUfJ2ovy1Oe5r2Mmpo05h5zVpLdEQM3Wi6ohT2BqWOJ22xtVxYudgsabk4FHdM4ckuE5pWK/niiaVmiUdOoqI+a6CnB0TAj1DnuQM0F1Ph820vJCHc52260NK+1YNHP8At6/IJNu4A7kVQurQwnlPUddqLsUhtUpA5RtUeKkX8PmhrKN7Co714BBsTvWo2JIr2Cd96iNzvWOTPithj5qaOIvsoqlqH09utaYx80QuLK4t1UzRPGGGRzKRkVTK4qI9CMGpWx2rVdhmsE71RibPJjzVcfFW5EzCWz0qvGpLgdfpRZVi1RjirjqXkVO1TWFr7QT380UttN55gQPzqxGdG0n7zKXOwQjHzT3pumIQA4Gw8VV0XTjE2dqaILcBAQpzU0Vpom9P0bVFGdsgVa0/Q4UJlkQNKf8AURRexscFXO3xRUW6UC9Jp8QBHpA5+KSOJ+GYHuGkjjUB8526GuqvbLQXWLNRGTj5oPnzVdIks3IZds9qGFCpxkV1niTTVZS2M5AIrmus2ptLkrjbtSrFEJmmKx0GKW0jklZg7DOB/Kl5ScZ/WuhaXeq+n27MFyUFEpDz7QpAwPimHgebT7XiTT59VANmkuZMrzDocbfXB/KgLxtGgem/7Kr/AEiw4kMuuNEi+gwgllGUSTI3PgkZwT/vVQ6/a7r+g6joUFpZXEN1cLMHDRjaNQCDk/O23xXF3/F+fenb7UtW0rVuIfV0Yo6JEqyzIMJK++489hmklh3O3eg1AyKsRQll5u1R7Fc/FErBPUtpR35dqAU868rx4yDsDU2mQB2LMOhqmqFiAT1NHrKBooRyjtUVcikgtlDO2PjGaPaPd2szqF6/SlaHEsnJIO9E4tMu0T1LL398Dqao6Zp8UbgEEeaPWkSkDArkGm8VXOmzCO5DMVO4I3FdE4Z4ot9RUb8reDUoc7eLlH5VNUUNwhAwc5qYMKg0PShusLmBvgUUbpQzU1zCy9zQJHEUZMMYUbkgY+CaQeOtP9D0Xxhuhrqt7bczhiAcDOP1pC+0aHFpGWIJ58fy/wCKo5uoyD8daZtKuCNPhGR07/Wl1huCoxjrir8CH0VxzAY6DpQVHkdxyEbdBVjTLX73c+mzciheZiOuNun61ACENHdI0r1bE3kdw8MxUlHXov1qoqano9zZYmEbm1dQwZxggHz/AHxRTgAaQNXd9ZaEcseYPXxyc2d85+OmfmnTRNU0rUdA+73RjW4kjCzKxyzNjqNt+/xXNNcs4bO7KW7ew5ODvjeiiHHDaa+uyto5jNuUXJi/Az9ytUdMfkDZ8UOLZHzU1tIVVh5FEWeGdL/6lczO2fTgTmOO5OcD+VNFlZI8hXlAHSh3Dt1Hp2hO2My3EhyPgbD/AH/WjWguJZVYDY0UD1mwuNMZ5WhJhJxz46fNHeDr1cKDuGxkU23ujpqWnSW52LDakQ8M6npNzmKRoe4OMig6Tf6FpWr2OLuBC+NpFxzD86ShosuhXhe2kMkedlPXFXtPfiJ4UxPayEHdAChI8b0Rv4pEjgJyXcZdTvympQe0bUfvEKkbfU0cF2qjBYUB0fTDHA0xqDU7jlPIrkHwKgYm1i1TaSRVP1rR72CY+2VSPrSFPw9qeplmguwvfDUNTReItLuuZiXT+JHz/KmDol68ZGxrkv2mXS+vb2qEF93b6dqbo9RveeOOaJt+rHtSJcW76zxDdXsozbJJ6ab9cbbfzqwAdP06a4YOVyoPu27UY9EJ7VGAOlHEiSJQkaYXptWv3dDuRv8ASqEFlYnoatQTXEMRjidljY7qDsamCLnOK2OMbCiNVu5k3jJQjupwaqTPJM/NIxZj3NWima0MVBUKGt1Q/NT+nWwTHagwshwsY/CO2aceEzlwD2NJlr7rjfuacdCHozLy9zQdO0/90PNTyQLIPcMmqOkvlR/eis59h5fG9ZUMlEUG2APGBVZFW4mwBtQPVtWC3Dojc3KeX29jRjhtJZWDNneqGiQclksQGNqV9ftbuO05rBIfV/hfIZvof9qaJN5BnoKjvLaO5gZJFDIwwRUCPwrxTBzyWl+3oXaHBjkODRy71OKXKq4yfJqle8F2l8c+1iOhYe4fnV3TeFbPT4MEF2znLnP9aoC61cPbaZcTjJcryp8sdh/UUs6ZCIYFjC7AdvNOPEEKXEsUCj9lGecjye3+9VYLRE6AUAMIMnKn9K1KjPSmiO0gbGVGKy2lwFieUVRyQhayFU+KFvfzSMTykZ8VGbic9A1RBjkBG1aso74oT6tydvdWcXLDvRcEwF7GtLiQQxM22egFDW9Zerr+tV3kZ2Ck5xQxetG/ajf5G9OGlv8AtI2z2ApHtmOVJ7Cm7RXyqkH8NVHStFm2UEnoK14v1qbTdEmltFJlb2BsfhB6mgem6p+0KgYCnejAuEuRggFGGCG3zUxSZomp2UqpHPKolJySTuxNdW4ct0+7qysOm3k1zPVuCWvLlrjSGSGRfdyMcDrTJw1c63FCsNzZmMwe0ylxytjxQOc/7zY53qzGAUxtQjTJ765nl+926RwodnD55/pRUuoXOPpUGPTVGz5qhqV4sMbHOMCpLu6CRk82+KRuJ9bit3WKaXHODsKC7FfQTyElhkmriLE/4WFJ8MkM4zFKvxUhuLq3/dudq0G7kwRislj4pRTXriMftMmpf+5U7jf60HNfaB7QAawr79q1nEcYBSdHYnBUV6OWFFzIhZv5URmS4Uf6hn43qC6E/pLNzn0ycDG1S29t99m5I1/F4HQVDcQTLM9smSqtuM7A0VB7UiLE+4nGM1Fze7Iq1LbFHVXIzjeqrryuR4qNcJYX5Wpl0C4Cy8p3z0zSqGII3ozpErCRSu5B2olOpsrwK1zBy8pG/MM16DXL7TlQzWSyxf8A6RMenkiiWmXYnszA+3MuKgW4TSwBfKVjDfvQMgg7VUMXCur2mprLzYjlG492xH1pkt/RSHEUiSnmyxHmg/2axaPrGlaq9taIP/JZVcrhgCoxv+ZqhJpmoafeO9nfhiDjkkTIb9KkDik3txtt4qKefC5OKC2N3dTty3UIiYbtg5BqDVtXjTEELBnbYAHG/wDmKCtxNrkOm2rzTOM9FXO5PiuTaheyahdPcPLzFjsPApzuXinE121zE13BzLNazgPGynuvz/nek28+5Xl4xh9OAk4CwowXP5mqIUnlhxysykVdt9cuYcZbnUdjUVzo2p2qGb7vJJbj/WRiqUmA3LMjRH5FEMkOuWk+BcLyHzjarObFvcsiEH/2pQMBIzE4b4rXkn7KaKn0pLOVmE5UA9Mis6hawM7LbnlVd+veh7W7oM9cdK9ZzPFcIzjmwclSetBcWO40p+ZgUkdQSDtt2qtbvOZGkAbIbJPL0JozxFxBFqYtYoIiiQjJUjOGxjr4rR9Tgt9K+7Qq/qsCGYjA38UAiC3ub+75Y1Z33wPpXr7T57UZljKjJq5p901tBKIAUklGDJnovxU11qJurX7miczR5/aMe1QL/erumXAhmGemaqSoVYgitRtRqujaTqEXKOc4PnNUOIdSk1W4j06zOY+YKD2Zu1KMd7KicvNt9aK6DdxW90lwze5TsKMu6fZdo66Fay2wfnaXldj2JxVy/EVpeTlt2DEj470L4A1hL+8KRsCfTyd+lCvtQ4hXS9Se2iTM8ig79APNQQ65rwVzHbA8znlGBksT2HzQbVdGvLO402e+maOSQ+o67Hk9xHxkgdfGaCcKW9zxHryRNK6tnmMoOPTHcj56Ue4x4U1CwKGK5a6UnELFuVh5BBPjPTxVFvX+B/8Ap6LrNldNLHkepGidQe4/zvSvqNtpEdzJHYW0qXKNnLyAow8j4/TFF9E07WL+EafcTjlx7A8/4132/Lb/AAVHYcKS6LxFBHrDRyWrE7hjnB7/AN6oBw8S3qwizc8oB5BtkgdxvWraZqnoiVrV5LOQ9JRtn+tH+N9K0rQLtJrE2+HQcqc3MwI7/ToaHPxndXlh9zSCMLjlYtuWPkDtvgiiK54Pv5bJ72yiJiUczKrhiO/170NXTNVKgi1kYHvg71c0zXda0a5JgnmCyAZUrkOOoOD9atTtqEszSOlyrOeYgREDelUom7DIFIx5NFNJ06PUI5eZgG25GHagrxe4+n+lW0+82OGAeFsdR0NQV5oOWZ1D5AY9akZA6+owIH/t0P0qKGQNKrTZ5Cffg7kVa1O5a7dQihY4hyxoOwoKs05IKodqzAXyGPasJAc5Y7ePNZlcL7RUBG4tYbi2Z4vbgZGfPWhYhBHWpbRmZuQueVjsPmsupViOu5q9iL7uMbmj/CGk6bqOqrbapffc4WH7w43Pj4oMvzUgIBFMNfQXBnBFhol0b/S9Ta7jdeTB5SPOcik/7ctPeLUbO9x7JYyhPyKFfZ7x0OF/WguIXntJTzFEYAg47ZrT7ReNoeLJbaKztpILaDP70jmYnbt8UxCpw1ezabPLdWzFZwPYRn8+hG1GdX4y1LUr2M3xjkjhQIwTYt5OR5+lFuErDT5eGZZbpVkI5nfH40x48dqUZrGNyWh5hzHIHX8vp85qg3BqshjR9KuAk6DPLIQeXGP87/2k4m4ovb+KJbmRo7pNwiR4K+QaUZEkhkKsCpXv4ph4dvradriHW4pLqAx+11/eRHyp/TY//CtNO0e813neaYKrHBlbqSMbY81FZqOH9VDXMas0TcrBznI/z+ta6hcSaVfzW2l3zSwPjEmMMPr8/TIrN1oGr3dq2oyW8gQLlpH6n5x/xQMXEmt6be2sdxbCR5o9geXHMnfrU+nfaHFa2UNvPbSSPGvLzgjcDp1+MVR4Q4dg1COaG5un51XZVUbjcHr+VD9S4cjsr6a2ZpmMbYyE6jt3ohPgkZZQ2M4OcGjF7qyXVoISOU7Zz4oPGPdWJvxY8Co0wVySqDOKO6JaRSqZJSCR1UjYUEg2YY7ip1kcOyBiFYbgHrRK2vWRJ3iifmVSeVh3FVUjMrcqbk9Kn5QcZFXbRFEagKNxv+v/ADUXxLZ2CrhivP8AwsSAM9f7US4uSBpLG9typS4twrhR+F0OD/IiqcztFHIUOCWxnG/Qf3NDGdmX3MT7x1PxWkYIHivVtWj/AIW+lErV393KuM9zUq5VSQegzVe3ALEmpn2hagnSeSGzKxsy+oOUgHG3+YrNvevEnIVDrnoRv/maZNStLf8A6bp37Jd4yScdeg3pWvkWOUqgwPFATt54JlbnYY/hbemTh/hI3ulNdwyMjlyORtsgeDSI+yKR5I/Kul/Z3e3BsDAZSYkQsqkDY5oEO/tLiG8lVlJaNivtOcY8fFMdpx3erpgs/u8TuqlGkkPNzDPj6VRu3Y3E2T1Yk/qKXbM/+V+R/pQX4NXvbK6WaGd42DEjlOO9G212+mPqSXLOx6ttv/Klu5AydvFXLUZt4yf4RQf/2Q=="
            : "data:image/jpeg;base64,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"
        }
      />
      <div className={cx(`${cls}_content`)}>
        <p style={{ textAlign: inversion ? "left" : "right" }}>
          {dateTime || null}
        </p>
        <Text content={content} inversion={inversion} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatMessage;
