#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Read input
    vector<int> numbers;
    int x;
    while (cin >> x) {
        numbers.push_back(x);
    }

    int n = numbers[0];
    vector<vector<int>> matrix(n, vector<int>(n));

    // Fill matrix
    int index = 1;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            matrix[i][j] = numbers[index++];
        }
    }

    // DP table
    vector<vector<int>> dp(n, vector<int>(n, 0));

    // Fill DP table
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            if (i == 0 && j == 0)
                dp[i][j] = matrix[i][j];
            else if (i == 0)
                dp[i][j] = dp[i][j - 1] + matrix[i][j];
            else if (j == 0)
                dp[i][j] = dp[i - 1][j] + matrix[i][j];
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
        }
    }

    // Output the result
    cout << dp[n - 1][n - 1] << endl;
    return 0;
}
