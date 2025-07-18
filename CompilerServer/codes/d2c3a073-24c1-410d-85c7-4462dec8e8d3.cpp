#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {10, 25, 14, 7, 89, 56};
    int maxNum = numbers[0];

    for (int i = 1; i < numbers.size(); i++) {
        if (numbers[i] > maxNum) {
            maxNum = numbers[i];
        }
    }

    cout << "Maximum number: " << maxNum << endl;
    return 0;
}
