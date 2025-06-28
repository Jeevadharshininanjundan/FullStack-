#include <iostream>
#include <limits.h>
using namespace std;

int main() {
    int num;
    int maxNum = INT_MIN; // Initialize with the smallest integer

    // Read input until end-of-line (EOF or Enter key)
    while (cin >> num) {
        if (num > maxNum) {
            maxNum = num;
        }
    }

    cout << maxNum << endl;

    return 0;
}
