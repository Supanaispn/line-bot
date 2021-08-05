let list_data = [];
let list_body = [
  {
    type: "text",
    text: "d.price",
    color: "#b7b7b7",
    size: "xs",
  },
];

list_body.push(
  {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "text",
        text: "20:30",
        size: "sm",
        gravity: "center",
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "filler",
          },
          {
            type: "box",
            layout: "vertical",
            contents: [],
            cornerRadius: "30px",
            height: "12px",
            width: "12px",
            borderColor: "#EF454D",
            borderWidth: "2px",
          },
          {
            type: "filler",
          },
        ],
        flex: 0,
      },
      {
        type: "text",
        text: "Akihabara",
        gravity: "center",
        flex: 4,
        size: "sm",
      },
    ],
    spacing: "lg",
    cornerRadius: "30px",
    margin: "xl",
  },
  {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "filler",
          },
        ],
        flex: 1,
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "filler",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [],
                width: "2px",
                backgroundColor: "#B7B7B7",
              },
              {
                type: "filler",
              },
            ],
            flex: 1,
          },
        ],
        width: "12px",
      },
      {
        type: "text",
        text: " ",
        gravity: "center",
        flex: 4,
        size: "xs",
        color: "#8c8c8c",
      },
    ],
    spacing: "lg",
    height: "64px",
  }
);

list_data.push({
  type: "bubble",
  size: "mega",
  header: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "FROM",
            color: "#ffffff66",
            size: "sm",
          },
          {
            type: "text",
            text: "CHINA",
            color: "#ffffff",
            size: "xl",
            flex: 4,
            weight: "bold",
          },
        ],
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "TO",
            color: "#ffffff66",
            size: "sm",
          },
          {
            type: "text",
            text: "d.track",
            color: "#ffffff",
            size: "xl",
            flex: 4,
            weight: "bold",
          },
        ],
      },
    ],
    paddingAll: "20px",
    backgroundColor: "#0367D3",
    spacing: "md",
    height: "154px",
    paddingTop: "22px",
  },
  body: {
    type: "box",
    layout: "vertical",
    contents: list_body,
  },
});

let template = {
  type: "carousel",
  contents: list_data,
};
