import * as entity from "./domain/entities/category";
import * as domainRepository from "./domain/repositories/category.repository";
import * as domainValidators from "./domain/validators/category.validator";
import * as infraRepository from "./infra/repositories/category-in-memory.repository";
import * as listUseCase from "./application/use-cases/list-categories.use-case";
import * as createUseCase from "./application/use-cases/create-category.use-case";

export namespace CategoryModule {
  export namespace Application {
    export namespace UseCases {
      export namespace Category {
        export namespace ListUseCase {
          export import Input = listUseCase.Input;
          export import Output = listUseCase.Output;
          export import UseCase = listUseCase.ListCategoriesUseCase;
        }
        export namespace CreateUseCase {
          export import Input = createUseCase.Input;
          export import Output = createUseCase.Output;
          export import UseCase = createUseCase.CreateCategoryUseCase;
        }
      }
    }
  }

  export namespace Domain {
    export namespace Entities {
      export import Category = entity.Category;
      export import CategoryProperties = entity.CategoryProperties;
    }

    export namespace Repositories {
      export namespace Category {
        export import SearchFilter = domainRepository.CategorySearchFilter;
        export import SearchProps = domainRepository.SearchProps;
        export import SearchParams = domainRepository.SearchParams;
        export import SearchResult = domainRepository.SearchResult;
        export import Repository = domainRepository.CategoryRepository;
      }
    }

    export namespace Validators {
      export namespace Category {
        export import ValidatorFactory = domainValidators.CategoryValidatorFactory;
        export import Rules = domainValidators.CategoryRules;
        export import Validator = domainValidators.CategoryValidator;
      }
    }
  }

  export namespace Infra {
    export namespace Repositories {
      export namespace Category {
        export import InMemoryRepository = infraRepository.CategoryInMemoryRepository;
      }
    }
  }
}
