#include <iostream>
#include <sstream>
#include <climits>
using namespace std;

int main() {
    string line;
    getline(cin, line); // Read the entire line of input

    stringstream ss(line);
    int num, maxNum = INT_MIN;

    while (ss >> num) {
        if (num > maxNum) {
            maxNum = num;
        }
    }

    cout << maxNum << endl;
    return 0;
}
