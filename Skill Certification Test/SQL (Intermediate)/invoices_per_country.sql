/*
Enter your query below.
Please append a semicolon ";" at the end of the query
*/
SELECT co.country_name,count(*),AVG(i.total_price)
FROM country co,city ci, customer cu, invoice i
WHERE co.id= ci.country_id AND ci.id=cu.city_id AND cu.id=i.customer_id
GROUP BY co.country_name
HAVING AVG(i.total_price) > (SELECT AVG(total_price)FROM invoice);