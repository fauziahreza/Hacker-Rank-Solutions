/*
Enter your query below.
Please append a semicolon ";" at the end of the query
*/
WITH RankedTransactions AS (
  SELECT
    sender,
    dt,
    amount,
    LAG(dt) OVER (PARTITION BY sender ORDER BY dt) AS prev_dt
  FROM transactions
),

Sequences AS (
  SELECT
    sender,
    dt AS sequence_start,
    COALESCE(
      LEAD(dt) OVER (PARTITION BY sender ORDER BY dt),
      dt
    ) AS sequence_end,
    amount AS transaction_amount,
    TIME_TO_SEC(TIMEDIFF(COALESCE(
      LEAD(dt) OVER (PARTITION BY sender ORDER BY dt),
      dt
    ), dt)) AS time_difference
  FROM RankedTransactions
),

SuspiciousSequences AS (
  SELECT
    sender,
    sequence_start,
    sequence_end,
    COUNT(*) AS transactions_count,
    SUM(transaction_amount) AS transactions_sum
  FROM Sequences
  WHERE time_difference <= 3600
  GROUP BY sender, sequence_start, sequence_end
  HAVING transactions_count >= 2 AND transactions_sum >= 150
)

SELECT
  sender,
  MIN(sequence_start) AS sequence_start,
  MAX(sequence_end) AS sequence_end,
  transactions_count,
  ROUND(transactions_sum, 6) AS transactions_sum
FROM SuspiciousSequences
GROUP BY sender, sequence_start, sequence_end
ORDER BY sender, sequence_start, sequence_end;