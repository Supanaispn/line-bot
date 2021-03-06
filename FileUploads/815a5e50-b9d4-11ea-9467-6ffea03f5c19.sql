USE [WMSP_JCS]
GO
/****** Object:  Table [dbo].[ADM_M_MenuBar]    Script Date: 21/04/2020 4:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADM_M_MenuBar](
	[MenuBar_Id] [int] IDENTITY(1,1) NOT NULL,
	[Parent_Id] [int] NOT NULL,
	[MenuBar_Code] [varchar](20) NOT NULL,
	[MenuBar_NameEn] [varchar](50) NOT NULL,
	[MenuBar_NameTh] [nvarchar](50) NULL,
	[MenuBar_Desc] [nvarchar](500) NULL,
	[NavigationUri] [varchar](100) NULL,
	[Sequence] [smallint] NULL,
	[Icon_Image_Id] [int] NULL,
	[IsUri] [bit] NULL,
	[Created_Date] [datetime] NULL,
	[Created_By] [int] NULL,
	[Modified_Date] [datetime] NULL,
	[Modified_By] [int] NULL,
	[Active] [bit] NULL,
	[Menu_Type] [nvarchar](20) NULL,
	[Module] [nvarchar](50) NULL,
 CONSTRAINT [PK_ADM_M_MenuBar] PRIMARY KEY CLUSTERED 
(
	[MenuBar_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
