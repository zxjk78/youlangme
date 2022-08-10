package com.a603.youlangme.config;


import com.a603.youlangme.dto.grass.GrassResponseDto;
import com.a603.youlangme.dto.ranking.RankLogResponseDto;
import com.a603.youlangme.dto.ranking.UserLogDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@EnableCaching
@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @SuppressWarnings("deprecation")
    @Bean
    public CacheManager cacheManager() {
        RedisCacheManager.RedisCacheManagerBuilder builder = RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisConnectionFactory());
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())) // Value Serializer 변경
                .prefixKeysWith("Language:") // Key Prefix로 "Language:"를 앞에 붙여 저장
                .entryTtl(Duration.ofMinutes(30)); // 캐시 수명 30분
        builder.cacheDefaults(configuration);
        return builder.build();
    }

    @Primary
    @Bean
    public CacheManager cacheRankManager() {
        RedisCacheManager.RedisCacheManagerBuilder builder = RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisConnectionFactory());
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())) // Value Serializer 변경
                .prefixKeysWith("Rank:") // Key Prefix로 "Rank:"를 앞에 붙여 저장
                .entryTtl(Duration.ofMinutes(60)); // 캐시 수명 30분
        builder.cacheDefaults(configuration);
        return builder.build();
    }

    //@Primary
    @Bean
    public CacheManager cacheGrassManager() {
        RedisCacheManager.RedisCacheManagerBuilder builder = RedisCacheManager.RedisCacheManagerBuilder.fromConnectionFactory(redisConnectionFactory());
        RedisCacheConfiguration configuration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())) // Value Serializer 변경
                .prefixKeysWith("Grass:") // Key Prefix로 "Grass:"를 앞에 붙여 저장
                .entryTtl(Duration.ofMinutes(15)); // 캐시 수명 30분
        builder.cacheDefaults(configuration);
        return builder.build();
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new StringRedisSerializer());
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, UserLogDto> redisTemplate1(){
        RedisTemplate<String, UserLogDto> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(UserLogDto.class));
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, RankLogResponseDto> rankredisTemplate(){
        RedisTemplate<String, RankLogResponseDto> rankredisTemplate = new RedisTemplate<>();
        rankredisTemplate.setConnectionFactory(redisConnectionFactory());
        rankredisTemplate.setKeySerializer(new StringRedisSerializer());
        rankredisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(RankLogResponseDto.class));
        return rankredisTemplate;
    }

    @Bean
    public RedisTemplate<String, GrassResponseDto> grassredisTemplate(){
        RedisTemplate<String, GrassResponseDto> grassredisTemplate = new RedisTemplate<>();
        grassredisTemplate.setConnectionFactory(redisConnectionFactory());
        grassredisTemplate.setKeySerializer(new StringRedisSerializer());
        grassredisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(GrassResponseDto.class));
        return grassredisTemplate;
    }

    private ObjectMapper objectMapper() {
        PolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator
                .builder()
                .allowIfSubType(Object.class)
                .build();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.registerModule(new JavaTimeModule());
        mapper.activateDefaultTyping(ptv, ObjectMapper.DefaultTyping.NON_FINAL);
        return mapper;
    }
}