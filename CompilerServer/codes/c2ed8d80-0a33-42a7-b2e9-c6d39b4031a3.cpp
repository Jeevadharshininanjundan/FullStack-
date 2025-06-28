#include <iostream>
#include <climits>  // For INT_MIN
using namespace std;

int main() {
    int num;
    int maxNum = INT_MIN;

    while (cin >> num) {
        if (num > maxNum) {
            maxNum = num;
        }
    }

    cout << maxNum;
    return 0;
}
