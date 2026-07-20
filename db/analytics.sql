-- ========================================
-- Order Management - Analytics Queries
-- ========================================

-- 1. Total amount spent by each user (only counting successful payments)
--    Uses LEFT JOIN so users with zero spending still appear, with totalAmount = 0
SELECT 
  u.id AS "userId",
  u.first_name || ' ' || u.last_name AS "userName",
  COALESCE(SUM(p.amount), 0) AS "totalAmount"
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
LEFT JOIN payments p ON p.order_id = o.id AND p.status = 'succeeded'
GROUP BY u.id, u.first_name, u.last_name
ORDER BY u.id;


-- 2. Total number of orders per user, sorted by order count descending
--    Uses LEFT JOIN so users with zero orders still appear, with totalOrders = 0
SELECT 
  u.id AS "userId",
  u.first_name || ' ' || u.last_name AS "userName",
  COUNT(o.id) AS "totalOrders"
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.first_name, u.last_name
ORDER BY "totalOrders" DESC;


-- 3. Payment failure ratio per user
--    ratio = totalFailed / (totalFailed + totalSucceeded)
--    NULLIF avoids division by zero for users with no payment records (ratio shows NULL)
SELECT
  u.id AS "userId",
  u.first_name || ' ' || u.last_name AS "userName",
  COUNT(CASE WHEN p.status = 'succeeded' THEN 1 END) AS "totalSucceeded",
  COUNT(CASE WHEN p.status = 'failed' THEN 1 END) AS "totalFailed",
  ROUND(
    COUNT(CASE WHEN p.status = 'failed' THEN 1 END)::numeric /
    NULLIF(COUNT(CASE WHEN p.status IN ('failed', 'succeeded') THEN 1 END), 0),
    2
  ) AS "ratio"
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
LEFT JOIN payments p ON p.order_id = o.id
GROUP BY u.id, u.first_name, u.last_name
ORDER BY u.id;