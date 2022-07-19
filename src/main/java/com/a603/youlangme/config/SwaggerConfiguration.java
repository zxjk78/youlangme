package com.a603.youlangme.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket SwaggerApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(swaggerInfo())
                .select()
                .apis(RequestHandlerSelectors.any()) // RequestMapping으로 할당된 모든 URL 추출
                .paths(PathSelectors.ant("/**"))
                .build();
    }

    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder().title("REST API 테스트 문서")
                .description("REST API 테스트 설명 문서, 2022-07-15, 이민호")
                .build();
    }

}
