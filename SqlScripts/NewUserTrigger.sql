USE [BYSDN]
GO
/****** Object:  Trigger [dbo].[TGR_InsertUser]    Script Date: 5/9/2016 4:27:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER TRIGGER [dbo].[TGR_InsertUser] 
   ON  [dbo].[Table_User]
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @UserID UNIQUEIDENTIFIER,
		@Photo VARCHAR(511),
		@OperationTypeId UNIQUEIDENTIFIER,
		@ID UNIQUEIDENTIFIER

	SET @ID = NEWID()



	SELECT @OperationTypeId = ID FROM [dbo].[Table_OperationType] WHERE [Type] = 'Registe'

	SELECT @UserID = ID,@Photo = Photo FROM INSERTED;

	IF @Photo IS NULL
	BEGIN
		SET @Photo = ''
	END

    -- Insert statements for trigger here
	INSERT INTO [dbo].[Table_LogEntity]
	VALUES (@ID,@OperationTypeId,'New User',NULL,@Photo)

	INSERT INTO [dbo].[Table_OperationLog]
	VALUES(NEWID(),GETDATE(),@ID,@UserID)

END
