USE [WMSP_JCS]
GO
/****** Object:  Table [dbo].[ADM_M_Group_Permission]    Script Date: 21/04/2020 4:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADM_M_Group_Permission](
	[UserGroup_Id] [int] NOT NULL,
	[MenuBar_Id] [int] NOT NULL,
	[Edge_Id] [int] NOT NULL,
	[Action_Id] [int] NOT NULL,
 CONSTRAINT [PK_ADM_M_Group_Permission] PRIMARY KEY CLUSTERED 
(
	[UserGroup_Id] ASC,
	[MenuBar_Id] ASC,
	[Edge_Id] ASC,
	[Action_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
