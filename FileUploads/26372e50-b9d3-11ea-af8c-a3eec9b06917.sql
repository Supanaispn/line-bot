USE [WMSP_JCS]
GO
/****** Object:  Table [dbo].[ADM_M_ImageCategory]    Script Date: 21/04/2020 4:52:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADM_M_ImageCategory](
	[ImageCategory_Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Parent_Id] [smallint] NOT NULL,
	[ImageCategory_Code] [varchar](20) NOT NULL,
	[ImageCategory_NameEN] [varchar](50) NOT NULL,
	[ImageCategory_NameTH] [nvarchar](50) NULL,
	[ImageCategory_Desc] [nvarchar](500) NULL,
	[Created_Date] [datetime] NOT NULL,
	[Created_By] [int] NOT NULL,
	[Modified_Date] [datetime] NULL,
	[Modified_By] [int] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ADM_M_ImageCategory] PRIMARY KEY CLUSTERED 
(
	[ImageCategory_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
EXEC sys.sp_addextendedproperty @name=N'Description', @value=N'Administrator Master Image Category' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ADM_M_ImageCategory'
GO
