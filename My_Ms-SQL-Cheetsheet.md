## Comprehensive Student Notes on MS SQL Code

### Introduction to SQL Statements

#### Types of SQL Statements
- **DML (Data Manipulation Language):** 
  - Operations: `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- **DDL (Data Definition Language):**
  - Operations: `CREATE`, `ALTER`, `DROP`, `RENAME`
- **DCL (Data Control Language):**
  - Operations: `GRANT`, `REVOKE`
- **TCL (Transaction Control Language):**
  - Operations: `COMMIT`, `ROLLBACK`, `SAVEPOINT`

### Database and Schema Management

#### Creating a Database
```sql
USE master;
GO
CREATE DATABASE AncShoppingMall
ON (
    NAME = ancDataBase,
    FILENAME = 'C:\Anc\ancshoppingDb.mdf',
    SIZE = 100MB,
    MAXSIZE = 600MB,
    FILEGROWTH = 10%
)
LOG ON (
    NAME = logancDataBase,
    FILENAME = 'C:\Anc\logancshoppingDb.ldf',
    SIZE = 100MB,
    MAXSIZE = 600MB,
    FILEGROWTH = 10%
);
GO
```

#### Renaming a Database
```sql
ALTER DATABASE TryancDB MODIFY NAME = TryancDB_2;
GO
sp_renamedb 'TryancDB_2', 'TryancDB';
GO
```

#### Dropping a Database
```sql
USE master;
GO
DROP DATABASE TryancDB;
GO
```

### Schema Management

#### Creating a Schema
```sql
USE AncShoppingMall;
GO
CREATE SCHEMA sch_anc;
GO
```

#### Checking if Schema Exists
```sql
SELECT * FROM sys.schemas;
SELECT CATALOG_NAME FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = 'sch_anc';
```

### Table Management

#### Creating a Table
```sql
CREATE TABLE Product_Tb (
    proSerialNo NVARCHAR(12) NOT NULL CONSTRAINT pkprodSrno PRIMARY KEY,
    productname NVARCHAR(12),
    expiryDate DATE,
    Qtyavail SMALLINT,
    proddescription NVARCHAR(100)
);
```

#### Altering a Table
```sql
ALTER TABLE Product_Tb
ADD Price SMALLMONEY;
```

#### Dropping a Constraint
```sql
ALTER TABLE sch_anc.Product
DROP CONSTRAINT chkproDname;
GO
```

### Data Insertion and Deletion

#### Inserting Data
```sql
INSERT INTO Product_Tb VALUES
('anc0001', 'radio', '11/02/1990', 100, 'a mini radio from sony company');

INSERT INTO Product_Tb (proSerialNo, productname, expirydate, Qtyavail, proddescription)
VALUES ('anc0002', 'Computer', '11/02/1990', 100, 'a laptop from dell');
```

#### Deleting Data
```sql
DELETE FROM sch_anc.Product
WHERE proSerialNo = 'anc0002';
```

### Constraints

#### Adding Constraints
```sql
ALTER TABLE Product_Tb
ADD CONSTRAINT chkproDname
CHECK (productname NOT IN (''));
```

#### Dropping Constraints
```sql
ALTER TABLE sch_anc.Product
DROP CONSTRAINT chkproDname;
GO
```

### Views

#### Creating a View
```sql
CREATE VIEW Anc_Secretary_customerTb AS 
SELECT cusemail, firstname, othername, surname, phone_contact FROM customer_Tb;
GO

CREATE VIEW Anc_Secretary_ProductTb AS
SELECT proSerialNo, productname, expiryDate, Qtyavail, proddescription FROM Product_Tb;
GO
```

#### Altering a View
```sql
ALTER VIEW Anc_Secretary_ProductTb AS 
SELECT 'Product Serial' = proSerialNo, 'Product Name' = productname, 'Expiry Date' = expiryDate, 
'Quantity Avail' = Qtyavail, 'Product Description' = proddescription, 'Unit Price' = Price 
FROM Product_Tb;
GO
```

### Indexing

#### Creating an Index
```sql
CREATE INDEX idx_ProductTB ON Product_Tb (proSerialNo, Qtyavail);
```

#### Creating a Clustered Index
```sql
CREATE UNIQUE CLUSTERED INDEX indexonCustomerTb
ON Anc_Secretary_customerTb ([Phone Contact]);
```

### Functions and Procedures

#### Creating a Function
```sql
CREATE FUNCTION sch_anc.displayLeastNumber(@b1 SMALLINT, @b2 SMALLINT, @b3 SMALLINT)
RETURNS SMALLINT AS
BEGIN
    DECLARE @leastNo SMALLINT;
    IF (@b1 < @b2 AND @b1 < @b3) 
        SET @leastNo = @b1;
    ELSE IF (@b2 < @b3) 
        SET @leastNo = @b2;
    ELSE 
        SET @leastNo = @b3;
    RETURN @leastNo;
END;
GO
```

#### Calling a Function
```sql
SELECT sch_anc.displayLeastNumber(100, 30, 10) AS LeastNumber;
```

### Control Flow

#### If-Else Statements
```sql
DECLARE @n1 SMALLINT = 90, @n2 SMALLINT = 88;
IF (@n1 <> @n2)
    PRINT (STR(@n1) + ' is greater');
ELSE
    PRINT (LTRIM(STR(@n2)) + ' is greater');
```

#### While Loop
```sql
DECLARE @temp SMALLINT, @result VARCHAR(10);
SET @result = '';
SELECT @temp = 0;
WHILE @temp < 10
BEGIN
    SET @result = @result + CONVERT(VARCHAR, @temp) + ',';
    IF (@temp = 5) BREAK;
    SET @temp = @temp + 1;
END;
PRINT(@result);
GO
```

### Transactions

#### ACID Properties
- **Atomicity:** Transactions are all-or-nothing.
- **Consistency:** Transactions leave the database in a consistent state.
- **Isolation:** Transactions do not interfere with each other.
- **Durability:** Once committed, transactions are permanent.

#### Transaction Control
```sql
BEGIN TRANSACTION;
    -- SQL statements
    IF (@@ERROR = 0)
        COMMIT TRANSACTION;
    ELSE
        ROLLBACK TRANSACTION;
```

### User and Permission Management

#### Creating a User
```sql
CREATE USER Khophy1 WITHOUT LOGIN;
GRANT SELECT ON OBJECT::LoginTb TO Khophy1;
GO
```

#### Granting and Revoking Permissions
```sql
GRANT UNMASK TO Khophy1;
GO
REVOKE UNMASK FROM Khophy1;
GO
```

### Advanced Topics

#### Masked Data
```sql
CREATE TABLE LoginTb (
    username VARCHAR(10) MASKED WITH (FUNCTION = 'default()'),
    userpasword VARCHAR(10) MASKED WITH (FUNCTION = 'default()')
);

ALTER TABLE LoginTb
ALTER COLUMN username VARCHAR(10) MASKED WITH (FUNCTION = 'partial(2,"*****",2)');
```

#### Creating Login from Windows
```sql
CREATE LOGIN [HBYV7S2\sqlUser] FROM WINDOWS
WITH DEFAULT_DATABASE = [AncShoppingMall];

CREATE USER [sqlUser] FOR LOGIN [HBYV7S2\sqlUser];
GRANT EXECUTE ON OBJECT::AddressTb TO [HBYV7S2\sqlUser];
GO
ALTER ROLE db_owner ADD MEMBER [HBYV7S2\sqlUser];
```

### Built-in Functions and Operators

#### String Functions
```sql
SELECT UPPER('chiany'), LOWER('KITCHER');
```

#### Aggregate Functions
```sql
SELECT COUNT(cusemail) AS [Total Customer] FROM customer_Tb;
SELECT AVG(Total_Amount_Paid) AS [Average sales made] FROM Order_Tb;
```

### Practical Examples

#### Taking Orders
```sql
BEGIN
    INSERT INTO Product_Tb VALUES ('anc0001', 'radio', '11/02/1990', 100, 'a mini radio from sony company');
    INSERT INTO customer_Tb (cusemail, firstname, othername, surname, phone_contact)
    VALUES ('kitchersimon@gmail.com', 'chiany', 'Simon', 'Kitcher', '0578888140');
    INSERT INTO AddressTb (cusemail, City, Street, Country)
    VALUES ('kitchersimon@gmail.com', 'Accra', 'Annan street', 'Ghana');
    INSERT INTO Order_Tb VALUES ('oder001', 'chiany@gmail.com', 'anc0001', 20, 10, '07/07/2024', DEFAULT, 500.00);
    
    UPDATE Product_Tb SET Qtyavail = Qtyavail - 20 WHERE proSerialNo = 'anc0001';
END;
```

### Conclusion

This comprehensive guide covers key concepts and practical implementations in MS SQL. By understanding these elements, you can effectively manage databases, perform data operations, and ensure data integrity and security in your SQL projects.
