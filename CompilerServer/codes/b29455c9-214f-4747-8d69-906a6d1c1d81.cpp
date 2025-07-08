import java.util.Scanner;

public class MaxNumberFinder {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt user input
        System.out.println("Enter numbers separated by space:");
        String input = scanner.nextLine();

        // Split the input string into an array of numbers
        String[] numbers = input.split(" ");

        // Convert to integers and find the maximum
        int max = Integer.MIN_VALUE;

        for (String num : numbers) {
            int number = Integer.parseInt(num);
            if (number > max) {
                max = number;
            }
        }

        System.out.println("Maximum number: " + max);
    }
}
