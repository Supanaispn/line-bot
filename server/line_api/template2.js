let list = [];
let detail = [];
list.push({
  type: "text",
  text: "สถานะนำเข้าจากจีน",
  weight: "bold",
  size: "xl",
  color: "#4DE22BFF",
  contents: [],
});

response.data.data.map((d, i) => {
  detail.push({
    type: "box",
    layout: "baseline",
    contents: [
      {
        type: "text",
        text: i + 1 + "." + " " + `${d.type} : ${d.status}`,
        weight: "bold",
        size: "sm",
        margin: "md",
        contents: [],
      },
      // {
      //   type: "text",
      //   text: `${d.type} : ${d.status}`,
      //   weight: "bold",
      //   size: "sm",
      //   color: "#AAAAAA",
      //   align: "end",
      //   contents: [],
      // },
    ],
  });
});

list.push(
  {
    type: "box",
    layout: "vertical",
    spacing: "sm",
    contents: detail,
  },
  {
    type: "text",
    text: `${detail.length} รายการ`,
    size: "xxs",
    color: "#AAAAAA",
    wrap: true,
    contents: [],
  }
);

let res = await client.multicast(USER_ID, {
  type: "flex",
  altText: "Flex Message",
  contents: {
    type: "bubble",
    hero: {
      type: "image",
      url:
        "https://www.scbeic.com/stocks/product/f0x0/do/bh/eqcxdobh5j/banner_note_logistic.jpg",
      align: "center",
      gravity: "center",
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      contents: list,
    },
  },
});
