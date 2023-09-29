import { screen, render } from "@testing-library/react-native";
import RepositoryItem from "../../../src/components/RepositoryItem";
import '@testing-library/jest-native/extend-expect'


describe('each repo item', () => {
  test('contains ... ', () => {


    const item = {
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
    }
    render(<RepositoryItem item={item} />)

    const repoItem = screen.getByTestId('repositoryItem')
    console.log(repoItem)

    expect(repoItem).toHaveTextContent(item.fullName)
      .toHaveTextContent(item.description)
  })
})