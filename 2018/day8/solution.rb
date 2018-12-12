puzzle = File.read('./puzzle.txt').split.map(&:to_i).freeze

class Array
  def sum(identity = 0, &block)
    if block_given?
      map(&block).sum(identity)
    else
      inject { |sum, element| sum + element } || identity
    end
  end
end

# pass in a block that indicates what to do with the values
def extract(a, &b)
  child_count = a.shift
  meta_count = a.shift
  yield(child_count.times.map { extract(a, &b) }, a.shift(meta_count))
end

# solution 1
# sum up child and meta arrays
puts extract(puzzle.dup) { |child, meta| child.sum + meta.sum }

# solution 2
# sum up only indexed child nodes (1-indexed) or metadata
puts extract(puzzle.dup) do |child, meta|
  child.size == 0 ? meta.sum : meta.sum { |x| child[x+1] || 0}
end
