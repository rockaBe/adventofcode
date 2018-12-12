puzzle = File.read('./input.txt').chomp.freeze

def react(str)
  new_str = String.new
  str.each_char do |c|
    new_str << c
    new_str[-2, 2] = '' if new_str[-2] && needsElimination(new_str[-2], c)
  end
  new_str
end

def needsElimination(a, b)
  sameChar(a, b) && !sameCase(a, b)
end

def sameChar(a, b)
  a.downcase == b.downcase
end

def sameCase(a, b)
  isLower(a) && isLower(b) || !isLower(a) && !isLower(b)
end

def isLower(character)
  character == character.downcase && character != character.upcase
end

solution1 = react(puzzle)
solution2 = (?a..?z).map do |char|
  react(react(puzzle.dup).tr(char + char.upcase, '')).size
end.min
puts solution1.size
puts solution2
