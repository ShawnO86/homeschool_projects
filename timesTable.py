def create_row(start, end):
    '''Creates times table row from start to end,
    returns list of integers from index 1 to end.'''
    #init row with 1s, extra element added to account for index 0.
    row = [1 for _ in range(end + 1)]
    #loop for row length.
    for i in range(1, end + 1):
        #set each value by multiplying, and right align number with 3 spaces
        row[i] = str(start * i).rjust(3)
    return row[1:]

def create_table(start, end):
    '''Creates aa times table from start to end values.'''
    times_table = {}
    for i in range(start, end + 1):
        times_table[str(i) + 's'] = create_row(i, end)
    return times_table

def get_input(value):
    while True:
        try:
            val = int(input(value))
            return val
        except ValueError:
            print('Value must be a number!')


if __name__ == "__main__":
    start = get_input('Starting value: ')
    end = get_input('Ending value: ')
    table = create_table(start, end)
    txtFile = 'timesTable.txt'

    with open(txtFile, 'w') as file:
        for key in table:
            line = ' | '.join(table[key]) + '\n'
            print(line)
            file.write(line)