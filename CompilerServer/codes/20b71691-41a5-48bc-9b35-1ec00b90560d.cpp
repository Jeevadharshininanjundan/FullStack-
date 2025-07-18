import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int maxNum = Integer.MIN_VALUE;

        // Loop runs as long as there are more numbers
        while (scanner.hasNextInt()) {
            int num = scanner.nextInt();
            if (num > maxNum) {
                maxNum = num;
            }
        }

        System.out.println(maxNum);
    }
}
