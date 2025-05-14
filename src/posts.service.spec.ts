import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // Arrange
      const expectedPosts = posts.map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));

      // Act
      const result = postsService.findMany();

      // Assert
      expect(result).toEqual(expectedPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      // Arrange
      const expectedPosts = posts.slice(1, 3).map((post, index) => ({
        ...post,
        id: (index + 2).toString(),
      }));

      // Act
      const result = postsService.findMany({ skip: 1, limit: 2 });

      // Assert
      expect(result).toEqual(expectedPosts);
    });

    it('should return correct posts for skip option', () => {
      // Arrange
      const expectedPosts = posts.slice(2).map((post, index) => ({
        ...post,
        id: (index + 3).toString(),
      }));

      // Act
      const result = postsService.findMany({ skip: 2 });

      // Assert
      expect(result).toEqual(expectedPosts);
    });

    it('should return correct posts for limit option', () => {
      // Arrange
      const expectedPosts = posts.slice(0, 2).map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
      }));

      // Act
      const result = postsService.findMany({ limit: 2 });

      // Assert
      expect(result).toEqual(expectedPosts);
    });

    it('should return empty array if skip is greater than posts length', () => {
      // Act
      const result = postsService.findMany({ skip: 5 });

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array if limit is 0', () => {
      // Act
      const result = postsService.findMany({ limit: 0 });

      // Assert
      expect(result).toEqual([]);
    });
  });
});
