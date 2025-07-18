numbers = list(map(int, input().split()))
n = numbers[0]
matrix = []

# Reconstruct the matrix from the input
index = 1
for i in range(n):
    row = numbers[index:index + n]
    matrix.append(row)
    index += n

# Initialize a DP table
dp = [[0] * n for _ in range(n)]

# Fill the DP table
for i in range(n):
    for j in range(n):
        if i == 0 and j == 0:
            dp[i][j] = matrix[i][j]
        elif i == 0:
            dp[i][j] = dp[i][j-1] + matrix[i][j]
        elif j == 0:
            dp[i][j] = dp[i-1][j] + matrix[i][j]
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]) + matrix[i][j]

# The bottom-right cell contains the result
print(dp[-1][-1])
