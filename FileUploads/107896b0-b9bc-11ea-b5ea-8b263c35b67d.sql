USE [WMSP_JCS]
GO
/****** Object:  Table [dbo].[ADM_M_ImageItem]    Script Date: 21/04/2020 4:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADM_M_ImageItem](
	[ImageItem_Id] [int] IDENTITY(1,1) NOT NULL,
	[ImageCategory_Id] [smallint] NOT NULL,
	[ImageName] [nvarchar](50) NOT NULL,
	[ImageExt] [varchar](5) NOT NULL,
	[ImageDesc] [nvarchar](500) NULL,
	[ImageStream] [image] NULL,
	[Created_Date] [datetime] NOT NULL,
	[Created_By] [int] NOT NULL,
	[Modified_Date] [datetime] NULL,
	[Modified_By] [int] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ADM_M_ImageItem] PRIMARY KEY CLUSTERED 
(
	[ImageItem_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
