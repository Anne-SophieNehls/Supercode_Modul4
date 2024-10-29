SELECT * FROM Customers WHERE CustomerName LIKE 'A%';

SELECT * FROM Customers ORDER BY PostalCode DESC;

SELECT * FROM Customers WHERE Country = 'Mexico' ORDER BY City, CustomerName;

SELECT * FROM Customers WHERE Country IN ('Germany', 'UK', 'France');

SELECT * FROM Products;

SELECT * FROM Products WHERE Unit LIKE '%bottle%';

SELECT * FROM Products WHERE Price BETWEEN 20 AND 30;

SELECT CategoryID, COUNT (ProductID) AS AnzahlDerProdukte FROM Products GROUP BY CategoryID;