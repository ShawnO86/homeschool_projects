def create_row(start, end):
    '''Creates times table row from start to end, returns list of integers from index 1 to end.'''
    #init row with 1s, extra element added for index 0.
    row = [1 for _ in range(end + 1)]
    #loop for row length.
    for i in range(0, end + 1):
        #set each value by multiplying
        row[i] = start * i
    return row[1:]

def create_cols(start, end, cols = {}):
    '''Recursivly creates times table from each create_row() call, returns dictionary with a times table row multiplier as each key(1s, 2s, 3s, etc...)'''
    #base case returns if start meets end value
    if end < start:
        return
    else:
        #adds row to cols dictionary
        cols[str(start) + "s"] = create_row(start, end)
        #calls function again with updated 'columns'
        create_cols(start + 1, end, cols)
    return cols



if __name__ == "__main__":
    rows = int(input('Starting value: \n'))
    cols = int(input('Ending value: \n'))
    table = create_cols(rows, cols)
    txtFile = 'timesTable.txt'
    file = open(txtFile, 'w')
    for key in table:
        for ele in table[key]:
            line = f'{ele:^4} | '
            file.write(line)
            print(line, end=' ')
        print()
        file.write('\n\n')
    file.close()
    print(f'Times table has been created and written to {txtFile}.')
