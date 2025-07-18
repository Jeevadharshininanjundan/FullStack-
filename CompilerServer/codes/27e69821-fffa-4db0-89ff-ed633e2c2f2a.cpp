#include <iostream>
#include <climits>
using namespace std;

int main() {
    int num;
    int maxNum = INT_MIN;

    while (cin >> num) {
        if (num > maxNum) {
            maxNum = num;
        }
    }

    cout << maxNum << endl;
    return 0;
}


