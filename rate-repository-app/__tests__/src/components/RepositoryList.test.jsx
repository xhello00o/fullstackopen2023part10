import { RepositoryListContainer } from "../../../src/components/RepositoryList";
import { screen, render, within, fireEvent,waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../../src/components/SignIn";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const firstRepoData = repositories.edges[0].node
      const secondRepoData = repositories.edges[1].node

     render(<RepositoryListContainer repositories={repositories} />)
     screen.debug()

      
      const repositoryItems = screen.getAllByTestId('repositoryItem')
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // expect something from the first and the second repository item

      const convertNumbertoKString = (num) => {
        if (num >= 1000) {
          return `${(num/1000).toFixed(1)} k`
        }

        return num
      }
      
      const firstForksCountString = convertNumbertoKString(firstRepoData.forksCount)
      const firststargazersCountString = convertNumbertoKString(firstRepoData.stargazersCount)
      const firstReviewCountString = convertNumbertoKString(firstRepoData.reviewCount)



      const secondForksCountString = convertNumbertoKString(secondRepoData.forksCount)
      const secondstargazersCountString = convertNumbertoKString(secondRepoData.stargazersCount)
      const secondReviewCountString = convertNumbertoKString(secondRepoData.reviewCount)
    


  

      expect(firstRepositoryItem)
      .toHaveTextContent(repositories.edges[0].node.description)
      expect(firstRepositoryItem)
      .toHaveTextContent(repositories.edges[0].node.fullName)
      expect(firstRepositoryItem)
      .toHaveTextContent(repositories.edges[0].node.language)
      expect(firstRepositoryItem).toHaveTextContent(`${firstRepoData.ratingAverage}Rating`)
      expect(firstRepositoryItem).toHaveTextContent(firstForksCountString)
      expect(firstRepositoryItem).toHaveTextContent(firstReviewCountString)
      expect(firstRepositoryItem).toHaveTextContent(firststargazersCountString)  


      expect(secondRepositoryItem)
      .toHaveTextContent(repositories.edges[1].node.description)
      expect(secondRepositoryItem)
      .toHaveTextContent(repositories.edges[1].node.fullName)
      expect(secondRepositoryItem)
      .toHaveTextContent(repositories.edges[1].node.language)
      expect(secondRepositoryItem).toHaveTextContent(`${secondRepoData.ratingAverage}Rating`)
      expect(secondRepositoryItem).toHaveTextContent(secondForksCountString)
      expect(secondRepositoryItem).toHaveTextContent(secondReviewCountString)
      expect(secondRepositoryItem).toHaveTextContent(secondstargazersCountString) 



      




      // Add your test code here
    }

    );
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    test.only('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()
      render(<SignInContainer onSubmit={onSubmit}/>)

      fireEvent.changeText(screen.getByPlaceholderText("Username"),'kalle')
      fireEvent.changeText(screen.getByPlaceholderText("Password"),'password')
      fireEvent.press(screen.getByText("Sign in"))
      

      

      await waitFor(() => {
        console.log("hi")
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        }) 
      });
        // expect the onSubmit function to have been called once and with a correct first argument
        
    

    });
  });
});

describe('Example', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});